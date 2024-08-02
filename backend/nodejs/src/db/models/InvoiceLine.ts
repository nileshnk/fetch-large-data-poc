import {
  Table,
  Column,
  Model,
  ForeignKey,
  BelongsTo,
  DataType,
} from "sequelize-typescript";
import { Invoice } from "./Invoice";
import { Track } from "./Track";

@Table
export class InvoiceLine extends Model<InvoiceLine> {
  @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
  id!: number;

  @ForeignKey(() => Invoice)
  @Column({ type: DataType.INTEGER, allowNull: true })
  invoiceId!: number;

  @ForeignKey(() => Track)
  @Column({ type: DataType.INTEGER, allowNull: true })
  trackId!: number;

  @Column({ type: DataType.DECIMAL(10, 2) })
  unitPrice!: number;

  @Column({ type: DataType.INTEGER })
  quantity!: number;

  @BelongsTo(() => Invoice)
  invoice!: Invoice;

  @BelongsTo(() => Track)
  track!: Track;
}
