import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany } from "typeorm";
import { Note } from "./Note";
import { SharedNote } from "./SharedNote";

@Entity()
export class People {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @OneToMany(() => Note, note => note.owner)
  notes: Note[];

  @OneToMany(() => SharedNote, sharedNote => sharedNote.target)
  notesSharedWithYou: SharedNote[];

  @OneToMany(() => SharedNote, sharedNote => sharedNote.sender)
  notesYouShared: SharedNote[];
}
