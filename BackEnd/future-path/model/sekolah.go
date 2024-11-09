package model

type GetSekolah struct {
	Nama_Sekolah      string `json:"nama_sekolah"`
	Alamat_Sekolah    string `json:"alamat_sekolah"`
	Deskripsi_Sekolah string `json:"deskripsi_sekolah"`
}

type GetAllSekolah struct {
	Nama_Sekolah   string `json:"nama_sekolah"`
	Alamat_Sekolah string `json:"alamat_sekolah"`
}
