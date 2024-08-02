import {
  Table,
  Column,
  Model,
  ForeignKey,
  BelongsTo,
  HasMany,
  DataType,
} from "sequelize-typescript";
import { Customer } from "./Customer";
import { InvoiceLine } from "./InvoiceLine";

@Table
export class Invoice extends Model<Invoice> {
  @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
  id!: number;

  @Column({ type: DataType.DATE })
  invoiceDate!: Date;

  @ForeignKey(() => Customer)
  @Column({ type: DataType.INTEGER, allowNull: true })
  customerId!: number;

  @Column({ type: DataType.STRING })
  billingAddress!: string;

  @Column({ type: DataType.STRING })
  billingCity!: string;

  @Column({ type: DataType.STRING })
  billingState!: string;

  @Column({ type: DataType.STRING })
  billingCountry!: string;

  @Column({ type: DataType.STRING })
  billingPostalCode!: string;

  @Column({ type: DataType.DECIMAL(10, 2) })
  total!: number;

  @BelongsTo(() => Customer)
  customer!: Customer;

  @HasMany(() => InvoiceLine)
  invoiceLines!: InvoiceLine[];
}
