import { ApiProperty } from "@nestjs/swagger";
import { IsAlpha, MaxLength } from "class-validator";

export class CreateUserDTO {
  @ApiProperty()
  @IsAlpha()
  @MaxLength(10)
  name: string;
}