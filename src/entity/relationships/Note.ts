import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne, JoinColumn, OneToMany } from "typeorm";
import { People } from "./People";
import { SharedNote } from "./SharedNote";

@Entity()
export class Note {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  text: string;

  @Column()
  ownerId: number;
  @ManyToOne(() => People, people => people.notes)
  @JoinColumn({ name: "ownerId" })
  owner: People;

  @OneToMany(() => SharedNote, sharedNote => sharedNote.note)
  shares: SharedNote[];
}
