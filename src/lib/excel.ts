import * as XLSX from "xlsx";

export type ExcelSheetInput = {
   sheetName: string;
   data: Record<string, any> | Record<string, any>[];
};

export function exportToExcel(
   sheets: ExcelSheetInput[],
   filename = "export.xlsx",
): void {
   if (!Array.isArray(sheets) || sheets.length === 0) {
      throw new Error("Sheets array cannot be empty");
   }

   const workbook = XLSX.utils.book_new();

   sheets.forEach(({ sheetName, data }, index) => {
      if (!data) return;

      let rows = Array.isArray(data) ? data : [data];
      
      // convert all objects to string
      rows = rows.map((row) => {
         const newRow: Record<string, any> = {};
         for (const [key, value] of Object.entries(row)) {
            if (typeof value === "object" && value !== null) {
               newRow[key] = JSON.stringify(value);
            } else {
               newRow[key] = value;
            }
         }
         return newRow;
      });

      const worksheet = XLSX.utils.json_to_sheet(rows);

      const safeSheetName =
         sheetName.replace(/[:\\/?*\[\]]/g, "").slice(0, 31) ||
         `Sheet${index + 1}`;

      XLSX.utils.book_append_sheet(workbook, worksheet, safeSheetName);
   });

   XLSX.writeFile(workbook, filename);
}
