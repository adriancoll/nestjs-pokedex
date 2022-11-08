import { IsOptional, Min, IsPositive, IsInt } from "class-validator";

export class PaginationDto {
  @IsOptional()
  @IsInt()
  @IsPositive()
  @Min(1)
  limit: number;

  @IsOptional()
  @IsInt()
  @IsPositive()
  @Min(1)
  offset: number;
}
