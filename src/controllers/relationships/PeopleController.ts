import "reflect-metadata";
import { getRepository, } from "typeorm";
import { People } from "../../entity/relationships/People";
import { Note } from "../../entity/relationships/Note";
import { SharedNote } from "../../entity/relationships/SharedNote";
import { Request, Response } from "express";

export class PeopleController {

  // Create User
  static createUser = async (req: Request, res: Response) => {
    try {
      const newPeople = {
        username: req.body.username,
      };
      const people = getRepository(People).create(newPeople);
      const result = await getRepository(People).save(people);
      res.status(201).json(result);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  // Create Note
  static createNote = async (req: Request, res: Response) => {
    try {
      const newNote = {
        text: req.body.text,
        ownerId: req.body.ownerId
      };
      const note = getRepository(Note).create(newNote);
      const result = await getRepository(Note).save(note);
      res.status(201).json(result);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  // Create sharedNote
  static sharedNote = async (req: Request, res: Response) => {
    try {
      const newSharedNote = {
        senderId: req.body.senderId,
        targetId: req.body.targetId,
        noteId: req.body.noteId
      };
      const sharedNote = getRepository(SharedNote).create(newSharedNote);
      const result = await getRepository(SharedNote).save(sharedNote);
      res.status(201).json(result);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  // Find SharedNotes with sender and note details
  static findSharedNote = async (req: Request, res: Response) => {
    try {
      const result = await getRepository(SharedNote).find({ 
        where: { targetId: req.body.targetId },
        relations: ["sender","note"]});

      if (result) {
        res.status(200).json(result);
      } else {
        res.status(404).json('SharedNote Not found!');
      }
    } catch (err) {
      res.status(500).json(err);
    }
  }

  // Find User with Notes
  static findUser = async (req: Request, res: Response) => {
    try {
      const result = await getRepository(People).findOne({ id: req.body.id },
        { relations: ["notesYouShared","notesYouShared.note"] });

      if (result) {
        res.status(200).json(result);
      } else {
        res.status(404).json('User Not found!');
      }

    } catch (err) {
      res.status(500).json(err);
    }
  }

}

