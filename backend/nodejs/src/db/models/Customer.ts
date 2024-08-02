import {
  Table,
  Column,
  Model,
  ForeignKey,
  BelongsTo,
  HasMany,
  DataType,
} from "sequelize-typescript";
import { Employee } from "./Employee";
import { Invoice } from "./Invoice";

@Table
export class Customer extends Model<Customer> {
  @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
  id!: number;

  @Column({ type: DataType.STRING })
  firstName!: string;

  @Column({ type: DataType.STRING })
  lastName!: string;

  @Column({ type: DataType.STRING })
  company!: string;

  @Column({ type: DataType.STRING })
  address!: string;

  @Column({ type: DataType.STRING })
  city!: string;

  @Column({ type: DataType.STRING })
  state!: string;

  @Column({ type: DataType.STRING })
  country!: string;

  @Column({ type: DataType.STRING })
  postalCode!: string;

  @Column({ type: DataType.STRING })
  phone!: string;

  @Column({ type: DataType.STRING })
  fax!: string;

  @Column({ type: DataType.STRING })
  email!: string;

  @ForeignKey(() => Employee)
  @Column({ type: DataType.INTEGER, allowNull: true })
  supportRepId!: number | null;

  @BelongsTo(() => Employee)
  supportRep!: Employee;

  @HasMany(() => Invoice)
  invoices!: Invoice[];
}
