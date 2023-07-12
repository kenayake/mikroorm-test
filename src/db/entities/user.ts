import { Entity, PrimaryKey, SerializedPrimaryKey, Property, OneToMany, Collection, ManyToMany, ManyToOne } from "@mikro-orm/core";


@Entity()
export class User {
    @PrimaryKey()
    _userID!: number

    @SerializedPrimaryKey()
    userID!: string

    @Property()
    fullName!: string

    @Property()
    email!: string

    @Property()
    password!: string

    @Property()
    role!: string
}