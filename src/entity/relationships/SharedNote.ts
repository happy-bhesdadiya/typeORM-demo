import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  ManyToOne,
  JoinColumn,
  PrimaryColumn
} from "typeorm";
import { People } from "./People";
import { Note } from "./Note";

@Entity()
export class SharedNote {
  @PrimaryColumn()
  targetId: number;
  @ManyToOne(() => People, people => people.notesSharedWithYou)
  @JoinColumn({ name: "targetId" })
  target: People;

  @PrimaryColumn()
  senderId: number;
  @ManyToOne(() => People, people => people.notesYouShared)
  @JoinColumn({ name: "senderId" })
  sender: People;

  @PrimaryColumn()
  noteId: number;
  @ManyToOne(() => Note, note => note.shares)
  @JoinColumn({ name: "noteId" })
  note: Note;
}
