import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

export function waitForSvg(el: HTMLElement) {
   return new Promise<void>((resolve) => {
      // Resolve immediately when SVG is already present to avoid deadlocks.
      if (el.querySelector("svg")) {
         resolve();
         return;
      }

      const observer = new MutationObserver(() => {
         if (el.querySelector("svg")) {
            observer.disconnect();
            resolve();
         }
      });
      observer.observe(el, { childList: true, subtree: true });
   });
}

async function loadPrintBanner() {
   return new Promise<{
      dataUrl: string;
      width: number;
      height: number;
   } | null>((resolve) => {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.decoding = "async";

      img.onload = () => {
         if (!img.naturalWidth || !img.naturalHeight) {
            resolve(null);
            return;
         }

         const canvas = document.createElement("canvas");
         canvas.width = img.naturalWidth;
         canvas.height = img.naturalHeight;

         const ctx = canvas.getContext("2d");
         if (!ctx) {
            resolve(null);
            return;
         }

         ctx.drawImage(img, 0, 0);
         resolve({
            dataUrl: canvas.toDataURL("image/png"),
            width: img.naturalWidth,
            height: img.naturalHeight,
         });
      };

      img.onerror = () => resolve(null);
      img.src = "/distract-text-dark.svg";
   });
}

export async function printElement(
   el: HTMLElement,
   options?: {
      margin?: number;
      width?: string;
      height?: string;
      fitToSinglePage?: boolean;
      showButtons?: boolean;
   },
) {
   const originalStyle = el.getAttribute("style") || "";

   // Apply print styles
   el.style.position = "fixed";
   el.style.zIndex = "-9999";
   el.style.pointerEvents = "none";
   el.style.paddingBottom = "16px";

   const origButtonVisibilities = new WeakMap<HTMLElement, string>();
   const buttons = el.querySelectorAll<HTMLElement>("button");
   if (!options?.showButtons) {
      buttons.forEach((btn) => {
         origButtonVisibilities.set(btn, btn.style.visibility);
         btn.style.visibility = "hidden";
      });
   }

   if (options?.width && !options?.fitToSinglePage)
      el.style.width = options.width;
   if (options?.height && !options?.fitToSinglePage)
      el.style.height = options.height;

   const restoreStyles = () => {
      el.setAttribute("style", originalStyle);
      if (!options?.showButtons) {
         buttons.forEach((btn) => {
            const origVisibility = origButtonVisibilities.get(btn);
            if (origVisibility !== undefined)
               btn.style.visibility = origVisibility;
            else btn.style.removeProperty("visibility");
         });
      }
   };

   try {
      await waitForSvg(el);
      await document.fonts.ready;

      const pdf = new jsPDF("p", "mm", "a4");
      const margin = options?.margin ?? 5;
      const pdfWidth = pdf.internal.pageSize.getWidth() - 2 * margin;
      const pdfHeight = pdf.internal.pageSize.getHeight() - 2 * margin;
      const banner = await loadPrintBanner();
      const bannerGapMm = banner ? 4 : 0;
      const bannerWidthMm = banner ? Math.min(pdfWidth, 30) : 0;
      const bannerHeightMm =
         banner && bannerWidthMm
            ? (bannerWidthMm * banner.height) / banner.width
            : 0;
      const pageTopY = banner ? margin + bannerHeightMm + bannerGapMm : margin;
      const allEntities = Array.from(
         el.querySelectorAll<HTMLElement>(".print-entity"),
      );
      const entities = allEntities
         .filter((node) => !node.parentElement?.closest(".print-entity"))
         .map((entity) => {
            const wrapper = document.createElement("div");
            entity.parentElement?.insertBefore(wrapper, entity);
            wrapper.appendChild(entity);
            wrapper.style.height = "fit-content";
            wrapper.style.width = "100%";
            wrapper.style.paddingBottom = "1rem";
            return wrapper;
         });

      const printEntities = entities.length ? entities : [el];
      const captureScale = 2;
      const pageBottom = margin + pdfHeight;
      const maxEntityHeightOnFreshPage = pageBottom - pageTopY;
      let currentY = pageTopY;
      let hasPrinted = false;
      const fitEpsilonMm = 0.2;

      const renderBanner = () => {
         if (!banner || !bannerWidthMm || !bannerHeightMm) return;
         pdf.addImage(
            banner.dataUrl,
            "PNG",
            margin,
            margin,
            bannerWidthMm,
            bannerHeightMm,
         );
      };

      const moveToNewPage = () => {
         pdf.addPage();
         renderBanner();
         currentY = pageTopY;
      };

      renderBanner();

      const captureElement = async (entity: HTMLElement) => {
         const captureId = `print-capture-${Math.random().toString(36).slice(2)}`;
         entity.setAttribute("data-print-capture-id", captureId);
         try {
            return await html2canvas(entity, {
               scale: captureScale,
               useCORS: true,
               backgroundColor: "#fff",
               x: 0,
               y: 0,
               onclone: (clonedDoc) => {
                  const clonedEntity = clonedDoc.querySelector<HTMLElement>(
                     `[data-print-capture-id="${captureId}"]`,
                  );
                  if (!clonedEntity) return;

                  // Prevent ancestor clipping in the cloned tree.
                  let parent: HTMLElement | null = clonedEntity;
                  while (parent && parent !== clonedDoc.body) {
                     parent.style.overflow = "visible";
                     parent.style.maxHeight = "none";
                     parent.style.maxWidth = "none";
                     parent.style.clipPath = "none";
                     parent = parent.parentElement;
                  }
               },
            });
         } finally {
            entity.removeAttribute("data-print-capture-id");
         }
      };

      const addCanvasAtCurrentY = (
         canvas: HTMLCanvasElement,
         sourceY: number,
         sourceHeight: number,
      ) => {
         const sliceCanvas = document.createElement("canvas");
         sliceCanvas.width = canvas.width;
         sliceCanvas.height = sourceHeight;

         const ctx = sliceCanvas.getContext("2d");
         if (!ctx) return 0;
         ctx.fillStyle = "#fff";
         ctx.fillRect(0, 0, sliceCanvas.width, sliceCanvas.height);

         ctx.drawImage(
            canvas,
            0,
            sourceY,
            canvas.width,
            sourceHeight,
            0,
            0,
            canvas.width,
            sourceHeight,
         );

         const renderHeightMm = (sourceHeight * pdfWidth) / canvas.width;
         pdf.addImage(
            sliceCanvas.toDataURL("image/jpeg"),
            "JPEG",
            margin,
            currentY,
            pdfWidth,
            renderHeightMm,
         );
         currentY += renderHeightMm;
         return renderHeightMm;
      };

      const addCanvasAsEntity = (canvas: HTMLCanvasElement) => {
         if (canvas.width === 0 || canvas.height === 0) return;

         const fullHeightMm = (canvas.height * pdfWidth) / canvas.width;
         const remainingMm = pageBottom - currentY;

         // Fits in current page.
         if (fullHeightMm <= remainingMm + fitEpsilonMm) {
            addCanvasAtCurrentY(canvas, 0, canvas.height);
            hasPrinted = true;
            return;
         }

         // Fits on a fresh page, move entity as a whole.
         if (fullHeightMm <= maxEntityHeightOnFreshPage + fitEpsilonMm) {
            if (hasPrinted) {
               moveToNewPage();
            }
            addCanvasAtCurrentY(canvas, 0, canvas.height);
            hasPrinted = true;
            return;
         }

         // Oversized entity: split only when one full page cannot contain it.
         if (hasPrinted && currentY > pageTopY + 0.01) {
            moveToNewPage();
         }

         let sourceY = 0;
         while (sourceY < canvas.height) {
            const pageRemainingMm = pageBottom - currentY;
            let sourceHeight = Math.floor(
               (pageRemainingMm * canvas.width) / pdfWidth,
            );

            if (sourceHeight <= 0) {
               moveToNewPage();
               continue;
            }

            sourceHeight = Math.min(sourceHeight, canvas.height - sourceY);
            addCanvasAtCurrentY(canvas, sourceY, sourceHeight);
            hasPrinted = true;
            sourceY += sourceHeight;

            if (sourceY < canvas.height) {
               moveToNewPage();
            }
         }
      };

      for (const entity of printEntities) {
         const canvas = await captureElement(entity);
         addCanvasAsEntity(canvas);
      }

      const totalPages = pdf.getNumberOfPages();
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      pdf.setFontSize(9);
      pdf.setTextColor(120);
      for (let page = 1; page <= totalPages; page++) {
         pdf.setPage(page);
         pdf.text(String(page), pageWidth - margin, pageHeight - margin / 2, {
            align: "right",
         });
      }

      return pdf;
   } finally {
      restoreStyles();
   }
}


