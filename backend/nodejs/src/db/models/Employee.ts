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

@Table
export class Employee extends Model<Employee> {
  @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
  id!: number;

  @Column({ type: DataType.STRING })
  lastName!: string;

  @Column({ type: DataType.STRING })
  firstName!: string;

  @Column({ type: DataType.STRING })
  title!: string;

  @Column({ type: DataType.DATE })
  birthDate!: Date;

  @Column({ type: DataType.DATE })
  hireDate!: Date;

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
  reportsTo!: number | null;

  @BelongsTo(() => Employee, { foreignKey: { allowNull: true } })
  manager!: Employee;

  @HasMany(() => Customer, { foreignKey: { allowNull: true } })
  customers!: Customer[];
}
