var objecte = {
    nom: "Daniel",
    age: 40,
    numFills: 3,
    teFills: function(){return this.numFills > 0;},
    toString: function(){
        return `El nom és ${this.nom}, té ${this.age} anys i ${this.numFills} fills`;
    }
};

var json = '{"nom": "Daniel"}';

console.log(objecte);