const bcrypt = require('bcrypt');
const Kegiatan = require("../models/Kegiatan");

module.exports = {
    getAllKegiatan: async(req, res) => {
        try {
            const kegiatans = await Kegiatan.find({}, "-__v")
            
            res.status(200).json({
                message: "Getting Data Kegiatan",
                data: kegiatans
            })
        } catch (error) {
            res.status(500).json({ message: "Server Error" })
        }
    },
    
    getKegiatanByID: async(req, res) => {
        try {
            const kegiatans = await Kegiatan.findById(req.params.id, "-__v")
            
            if(!kegiatans){
                res.status(404).json({
                    message : "Kegiatan tidak ditemukan"
                });
            } else{
                res.status(200).json({
                    message: "kamu mencari kegiatan",
                    data: kegiatans
                })
            }
        } catch (error) {
            res.status(500).json({ message: "Server Error" })
        }
    },
    uploadKegiatan: async (req, res) => {
        const { judul_kegiatan, tgl_kegiatan, lokasi_kegiatan, deskripsi } = req.body;
    
        try {
            const kegiatan = await Kegiatan.create({ judul_kegiatan, tgl_kegiatan, lokasi_kegiatan, deskripsi });
            res.status(201).json({ 
                kegiatan: kegiatan._id,
                judul_kegiatan: kegiatan.judul_kegiatan,
                tgl_kegiatan: kegiatan.tgl_kegiatan,
                lokasi_kegiatan: kegiatan.lokasi_kegiatan,
                deskripsi: kegiatan.deskripsi
             });
        }
        catch (err) {
            const errors = handleErrors(err);
            res.status(400).json({ errors })
        }
    }, 
    
    deleteKegiatanByID: async (req, res) => {
        try {
            const kegiatans = await Kegiatan.findById(req.params.id, "-__v")
            if(!kegiatans){
                res.status(404).json({
                    message : "Kegiatan tidak ditemukan"
                });
            } else{
                kegiatans.deleteOne()
                res.status(201).json({
                    message: "Kegiatan Deleted"
                })
            }
        } catch (error) {
            res.status(500).json({ message: "Server Error" })
        }
    },
    
    updateKegiatanByID: async (req, res) => {
        try {
            const kegiatans = await Kegiatan.findById(req.params.id, "-__v")
            
            Object.assign(kegiatans, req.body)
            kegiatans.save();
            res.status(201).send({ 
                message : "Kegiatan updated!",
                data : kegiatans })
        } catch (error) {
            res.status(500).json({ message: "Server Error" })
        }
    }
}
