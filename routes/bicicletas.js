const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const getBicicletas = () => {
    const data = fs.readFileSync(path.join(__dirname, '../data/bicicletas.json'));
    return JSON.parse(data);
};

const saveBicicletas = (bicicletas) => {
    fs.writeFileSync(path.join(__dirname, '../data/bicicletas.json'), JSON.stringify(bicicletas, null, 2));
};

router.get('/', (req, res) => {
    const bicicletas = getBicicletas();
    res.status(200).json(bicicletas);
});

router.get('/:id', (req, res) => {
    const bicicletas = getBicicletas();
    const bicicleta = bicicletas.find(b => b.id === parseInt(req.params.id));
    if (!bicicleta) return res.status(404).json({ message: 'Bicicleta no encontrada' });
    res.status(200).json(bicicleta);
});

router.post('/', (req, res) => {
    const bicicletas = getBicicletas();
    const newBicicleta = {
        id: bicicletas.length ? bicicletas[bicicletas.length - 1].id + 1 : 1,
        ...req.body
    };
    bicicletas.push(newBicicleta);
    saveBicicletas(bicicletas);
    res.status(201).json(newBicicleta);
});

router.put('/:id', (req, res) => {
    const bicicletas = getBicicletas();
    const index = bicicletas.findIndex(b => b.id === parseInt(req.params.id));
    if (index === -1) return res.status(404).json({ message: 'Bicicleta no encontrada' });

    bicicletas[index] = { id: bicicletas[index].id, ...req.body };
    saveBicicletas(bicicletas);
    res.status(200).json(bicicletas[index]);
});

router.delete('/:id', (req, res) => {
    let bicicletas = getBicicletas();
    const index = bicicletas.findIndex(b => b.id === parseInt(req.params.id));
    if (index === -1) return res.status(404).json({ message: 'Bicicleta no encontrada' });

    const deletedBicicleta = bicicletas.splice(index, 1);
    saveBicicletas(bicicletas);
    res.status(200).json({ message: 'Bicicleta eliminada', bicicleta: deletedBicicleta });
});

module.exports = router;
