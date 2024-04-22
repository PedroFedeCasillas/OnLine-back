// import { PartialType } from "@nestjs/mapped-types";
import { PartialType } from "@nestjs/swagger";
import { CreatePostDto } from "./create-post.dto";

export class UpdatePostDto extends PartialType(CreatePostDto) {}