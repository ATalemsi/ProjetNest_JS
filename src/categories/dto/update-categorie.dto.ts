import { CreateCategorieDto } from "./create-categorie.dto";
import { PartialType } from "@nestjs/mapped-types"

export class UpdateCategorieDto extends PartialType(CreateCategorieDto){ }
