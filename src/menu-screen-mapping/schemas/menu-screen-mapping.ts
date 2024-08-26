import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({ timestamps: { createdAt: "created_at", updatedAt: "updated_at" }, versionKey: false })
export class MenuScreenMappingModel {
    @Prop({ type: String, required: true })
    name: string;
    @Prop({ type: Array<Object>, required: true })
    layout: Array<Object>;
    @Prop({ type: Object, required: true })
    data: Object;
}
export const MenuScreenMappingSchema = SchemaFactory.createForClass(MenuScreenMappingModel);
export const MENU_SCREEN_MAPPING_TABLE = "menu_screen_mapping"