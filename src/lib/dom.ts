import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

export function waitForSvg(el: HTMLElement) {
   return new Promise<void>((resolve) => {
      const observer = new MutationObserver(() => {
         if (el.querySelector("svg")) {
            observer.disconnect();
            resolve();
         }
      });
      observer.observe(el, { childList: true, subtree: true });
   });
}

export async function printElement(
   el: HTMLElement,
   options?: {
      margin?: number;
      width?: string;
      height?: string;
      /** If true, ignores page breaks and fits everything on one page */
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

   if (options?.width && !options?.fitToSinglePage) {
      el.style.width = options.width;
   }
   if (options?.height && !options?.fitToSinglePage) {
      el.style.height = options.height;
   }

   await waitForSvg(el);
   await document.fonts.ready;

   const pdf = new jsPDF("p", "mm", "a4");
   const margin = options?.margin ?? 5;
   const pdfWidth = pdf.internal.pageSize.getWidth() - 2 * margin;
   const pdfHeight = pdf.internal.pageSize.getHeight() - 2 * margin;

   if (options?.fitToSinglePage) {
      // Render everything on a single page, ignoring page breaks
      const canvas = await html2canvas(el, {
         scale: 2,
         useCORS: true,
         backgroundColor: "#fff",
      });
      const scale = pdfWidth / canvas.width;
      const imgWidth = pdfWidth;
      const imgHeight = canvas.height * scale;
      const yOffset = (pdfHeight - imgHeight) / 2 + margin;

      pdf.addImage(
         canvas.toDataURL("image/png"),
         "PNG",
         margin,
         yOffset,
         imgWidth,
         imgHeight,
      );
   } else {
      // Split pages at elements with `[data-print-new-page]`
      const pageElements = Array.from(
         el.querySelectorAll<HTMLElement>("[data-print-new-page]"),
      );

      // If no page breaks, render the whole element as a single page
      if (pageElements.length === 0) {
         const canvas = await html2canvas(el, {
            scale: 2,
            useCORS: true,
            backgroundColor: "#fff",
         });
         const scale = pdfWidth / canvas.width;
         const imgWidth = pdfWidth;
         const imgHeight = canvas.height * scale;
         const yOffset = (pdfHeight - imgHeight) / 2 + margin;

         pdf.addImage(
            canvas.toDataURL("image/png"),
            "PNG",
            margin,
            yOffset,
            imgWidth,
            imgHeight,
         );
      } else {
         // Render first chunk: everything before the first page break
         const first = pageElements[0];
         const preCanvas = await html2canvas(el, {
            scale: 2,
            useCORS: true,
            backgroundColor: "#fff",
            y: 0,
            height: first.offsetTop,
         });
         pdf.addImage(
            preCanvas.toDataURL("image/png"),
            "PNG",
            margin,
            margin,
            pdfWidth,
            (preCanvas.height * pdfWidth) / preCanvas.width,
         );

         // Render each page break element separately
         for (let i = 0; i < pageElements.length; i++) {
            const chunk = pageElements[i];
            const next = pageElements[i + 1];
            const yStart = chunk.offsetTop;
            const yEnd = next ? next.offsetTop : el.scrollHeight;

            const chunkCanvas = await html2canvas(el, {
               scale: 2,
               useCORS: true,
               backgroundColor: "#fff",
               y: yStart,
               height: yEnd - yStart,
            });

            pdf.addPage();
            pdf.addImage(
               chunkCanvas.toDataURL("image/png"),
               "PNG",
               margin,
               margin,
               pdfWidth,
               (chunkCanvas.height * pdfWidth) / chunkCanvas.width,
            );
         }
      }
   }

   // Restore original styles
   el.setAttribute("style", originalStyle);
   if (!options?.showButtons) {
      buttons.forEach((btn) => {
         const origVisibility = origButtonVisibilities.get(btn);
         if (origVisibility !== undefined) {
            btn.style.visibility = origVisibility;
         } else {
            btn.style.removeProperty("visibility");
         }
      });
   }

   return pdf;
}
