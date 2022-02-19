import { ACHIEVEMENTS_SCHEMA_MAP, MASTER_SCHEMA } from "@src/data/schema";
import { FieldType } from "@src/data/schemas/types";
import { INPUT_TYPE } from "@src/data/types/types";
import * as docx from "docx"; // * as or it will crash
import { getWordFormatedValue } from "../util";

function getSections(
  _collectionData: any[],
  _key: string,
  _display: Object,
  achv_db_fld_pr: Map<string, FieldType>
): docx.ISectionOptions[] {
  const final_sections: docx.ISectionOptions[] = [];

  for (let userNo: number = 0; userNo < _collectionData.length; ++userNo) {
    const user_prof: any = _collectionData[userNo]["profile"];
    const user_achv: any[] = _collectionData[userNo][_key];

    if (!!user_achv && user_achv.length !== 0) {
      user_achv.forEach((_user_data_row) => {
        let data_rows: docx.ParagraphChild[] = [];

        achv_db_fld_pr.forEach((_field, _db_field_name: string) => {
          data_rows.push(
            new docx.TextRun({
              text: _field.label + ": ",
              break: 1,
              size: 24,
            })
          );

          data_rows.push(
            getWordFormatedValue(
              _user_data_row[_db_field_name],
              _field.input_type
            )
          );
        });

        final_sections.push({
          properties: { type: docx.SectionType.NEXT_PAGE },
          children: [
            new docx.Paragraph({
              heading: docx.HeadingLevel.TITLE,
              alignment: docx.AlignmentType.CENTER,
              children: [
                new docx.TextRun({
                  underline: {
                    type: docx.UnderlineType.WAVYHEAVY,
                    color: "000000",
                  },
                  text: ACHIEVEMENTS_SCHEMA_MAP.get(_key).diplay_name,
                  size: 36,
                }),
              ],
            }),
            new docx.Paragraph({
              children: [
                new docx.TextRun({
                  text: "Name: ",
                  break: 1,
                  size: 36,
                }),
                new docx.TextRun({
                  text: user_prof["name"],
                  size: 36,
                }),
              ],
            }),
            new docx.Paragraph({
              spacing: {
                line: 500,
              },
              children: data_rows,
            }),
          ],
        });
      });
    }
  }

  return final_sections;
}

export { getSections };
