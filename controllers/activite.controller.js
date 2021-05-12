const ActiviteModel = require("../models/activite.model");
const UserModel = require("../models/user.model");
const ObjectID = require("mongoose").Types.ObjectId;

module.exports.readActivite = (req,res) => {
    ActiviteModel.find((err, docs) => {

        if (!err) res.send(docs);

        else console.log('Error to get data: ' + err);
    }).sort({ createdAt: -1 });
}

module.exports.createActivite = async (req,res) => {
    console.log("createact");
    const newActivite = new ActiviteModel({
        activiterId: req.body.activiterId,
        nomactivite: req.body.nomactivite,
        description: req.body.description,
        datedebut:req.body.datedebut,
        datefin: req.body.datefin,
        type: req.body.type,
        users:req.body.users,
        
        notes: [],
        
      });
    
      try {
        const act = await newActivite.save();
        return res.status(201).json(act);
      } catch (err) {
        return res.status(400).send(err);
      }
    };



module.exports.updateActivite = (req,res) => {
    console.log("updateact");
    if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);
    const updatedRecord = {
        description: req.body.description,
        datefin: req.body.datefin,
    }
    ActiviteModel.findByIdAndUpdate(
        req.params.id,
        {$set: updatedRecord},
        {new: true},
        (err, docs) => {
            if (!err) res.send(docs);
            else console.log("Updated error: " +err);
        }
    )
}

module.exports.deleteActivite = (req,res) => {
    if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

    ActiviteModel.findByIdAndRemove(
        req.params.id,
        (err,docs) => {
            if (!err) res.send(docs);
            else console.log ("Delete error :" +err)
        }
    )
}


module.exports.noteActivite = (req, res) => {
    if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);
          
    try {
        return ActiviteModel.findByIdAndUpdate (
            req.params.id,
            {
                $push: {
                    notes : {
                        noteurId: req.body.noteurId ,
                        noteurPseudo: req.body.noteurPseudo,
                        text: req.body.text ,
                        timestamp: new Date().getTime()

                    }


                }
            },
            {new : true},
            (err,docs) => {
                if (!err) return res.send(docs);
                else return res.status(400).send(err);

            }

        )


        
    } catch (err) {
       return res.status(400).send(err);
    }

}

module.exports.editNoteActivite = (req, res) => {
    if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  try {
    return ActiviteModel.findById(req.params.id, (err, docs) => {
      const theact = docs.notes.find((note) =>
        note._id.equals(req.body.noteId)
      );

      if (!theact) return res.status(404).send("note not found");
      theact.text = req.body.text;

      return docs.save((err) => {
        if (!err) return res.status(200).send(docs);
        return res.status(500).send(err);
      });
    });
  } catch (err) {
    return res.status(400).send(err);
  }
};          


module.exports.DeleteNoteActivite = (req, res) => {
    if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);
console.log("del");
  try {
    return ActiviteModel.findByIdAndUpdate(
      req.params.id,
      {
        $pull: {
        notes: {
            _id: req.body.noteId,
          },
        },
      },
      { new: true },
      (err, docs) => {
        if (!err) return res.send(docs);
        else return res.status(400).send(err);
      }
    );
  } catch (err) {
    return res.status(400).send(err);
  }
};

