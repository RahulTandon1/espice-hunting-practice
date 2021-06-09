const Level = require("./levelModel");
const _ = require('lodash');
const bcrypt = require('bcrypt')

createLevel = async (name, author, text, answer) => {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashed = await bcrypt.hash(answer, salt);
        const level = new Level ({
            name: name,
            author: author, 
            levelText: text,
            answer: hashed
        });
        
        const result = await level.save();
        return result;
    }
    catch(err) {
        console.log("Error while making level for DB", err)
    }
},

addEndpoint =  async (objID) => {
    try{
        let lvl = await Level.findOneAndUpdate(
            {_id : objID},     // filter
            { endpoint: String(objID).slice(-4)},   // update 
            {new: true}
        )    // returns updated object
        return lvl.endpoint
    }
    catch (err) {
        console.log("Error while adding Endpoint")
    }
},


getAllLevels = async () => {
    try {
        let levels = await Level
        .find()
        //.limit()
        .sort({ date: 1})
        .select({ name: 1, author: 1, levelText:1 });
    
        levels.forEach( (level, index, levelsArr) => {
            return levelsArr[index] = _.pick(level, ['_id','name', 'author', 'levelText'])
        })
        return levels;
    }
    catch (err) {
        console.error(err);
    }
}    

isAnsCorrect = async(endpoint, answer) => {
    try {
        const level = await Level.findOne({endpoint: endpoint})
        const isValid = await bcrypt.compare(answer, level.answer);
        return isValid
    }
    catch(err) {
        console.error(err)
        return err
    }

}
module.exports.createLevel=createLevel;
module.exports.addEndpoint=addEndpoint;
module.exports.getAllLevels=getAllLevels;
module.exports.isAnsCorrect = isAnsCorrect;
