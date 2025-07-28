import { IsString, IsInt, Min } from 'class-validator';
import { Type } from 'class-transformer';




export class SummarizeTextDto {
  @IsString()
  text: string;

  @Type(() => Number) // needed to transform form input (string) to number
  @IsInt()
  @Min(1)
  batchSize: number;
}
