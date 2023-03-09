import Excel from 'exceljs';
import FileSaver from 'file-saver';
import { useState } from 'react';

import { Config, Status } from '../../models';

interface Props<T> {
  config: Config<T>;
}

const useXlsx = <T>({ config }: Props<T>) => {
  const [status, setStatus] = useState<Status | null>(null);

  const createAndSaveXlsx = () => {
    setStatus(Status.LOADING);

    try {
      const workbook = new Excel.Workbook();

      config?.workSheets?.forEach((workSheet, i) => {
        const sheet = workbook.addWorksheet(
          workSheet.name ? workSheet.name : `Sheet ${i + 1}`
        );

        sheet.columns = workSheet.columns;
        sheet.addRows(workSheet.data);

        workSheet.images?.forEach((image) => {
          const img = workbook.addImage({
            base64: image.base64,
            extension: image.extension,
          });

          sheet.addImage(img, { tl: image.position, ext: image.size });
        });
      });

      (async () => {
        try {
          FileSaver.saveAs(
            new Blob([await workbook.xlsx.writeBuffer()]),
            `${config?.fileName ? config?.fileName : 'file'}.xlsx`
          );
          setStatus(Status.OK);
        } catch (error) {
          setStatus(Status.ERROR);
        }
      })();
    } catch (error) {
      setStatus(Status.ERROR);
    }
  };

  return { createAndSaveXlsx, status };
};

export default useXlsx;
