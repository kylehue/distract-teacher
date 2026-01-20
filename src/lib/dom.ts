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

   await waitForSvg(el);
   await document.fonts.ready;

   const pdf = new jsPDF("p", "mm", "a4");
   const margin = options?.margin ?? 5;
   const pdfWidth = pdf.internal.pageSize.getWidth() - 2 * margin;
   const pdfHeight = pdf.internal.pageSize.getHeight() - 2 * margin;

   const pageElements = Array.from(
      el.querySelectorAll<HTMLElement>("[data-print-new-page]"),
   );

   // Helper to slice canvas vertically if it overflows
   const addCanvasToPdf = (canvas: HTMLCanvasElement) => {
      const scale = pdfWidth / canvas.width;
      const totalHeight = canvas.height * scale;

      if (totalHeight <= pdfHeight) {
         pdf.addImage(
            canvas.toDataURL("image/jpeg"),
            "JPEG",
            margin,
            margin,
            pdfWidth,
            totalHeight,
         );
      } else {
         let renderedHeight = 0;
         while (renderedHeight < canvas.height) {
            const pageCanvas = document.createElement("canvas");
            const pageScale = pdfWidth / canvas.width;
            const pageHeightPx = pdfHeight / pageScale;
            pageCanvas.width = canvas.width;
            pageCanvas.height = Math.min(
               pageHeightPx,
               canvas.height - renderedHeight,
            );

            const ctx = pageCanvas.getContext("2d")!;
            ctx.drawImage(
               canvas,
               0,
               renderedHeight,
               canvas.width,
               pageCanvas.height,
               0,
               0,
               canvas.width,
               pageCanvas.height,
            );

            if (renderedHeight > 0) pdf.addPage();
            pdf.addImage(
               pageCanvas.toDataURL("image/jpeg"),
               "JPEG",
               margin,
               margin,
               pdfWidth,
               (pageCanvas.height * pdfWidth) / pageCanvas.width,
            );

            renderedHeight += pageCanvas.height;
         }
      }
   };

   // Render everything before the first page break
   let lastOffset = 0;
   if (pageElements.length > 0) {
      const firstBreak = pageElements[0];
      const preCanvas = await html2canvas(el, {
         scale: 2,
         useCORS: true,
         backgroundColor: "#fff",
         y: 0,
         height: firstBreak.offsetTop,
      });
      addCanvasToPdf(preCanvas);
      lastOffset = firstBreak.offsetTop;
   } else {
      // No manual page breaks, render entire element as one chunk
      const fullCanvas = await html2canvas(el, {
         scale: 2,
         useCORS: true,
         backgroundColor: "#fff",
      });
      addCanvasToPdf(fullCanvas);
      lastOffset = el.scrollHeight;
   }

   // Render each chunk starting at a `[data-print-new-page]`
   for (let i = 0; i < pageElements.length; i++) {
      const current = pageElements[i];
      const next = pageElements[i + 1];
      const yStart = current.offsetTop;
      const yEnd = next ? next.offsetTop : el.scrollHeight;

      const chunkCanvas = await html2canvas(el, {
         scale: 2,
         useCORS: true,
         backgroundColor: "#fff",
         y: yStart,
         height: yEnd - yStart,
      });

      pdf.addPage();
      addCanvasToPdf(chunkCanvas);
      lastOffset = yEnd;
   }

   // Restore original styles
   el.setAttribute("style", originalStyle);
   if (!options?.showButtons) {
      buttons.forEach((btn) => {
         const origVisibility = origButtonVisibilities.get(btn);
         if (origVisibility !== undefined)
            btn.style.visibility = origVisibility;
         else btn.style.removeProperty("visibility");
      });
   }

   return pdf;
}
