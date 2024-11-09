package model

type GetUniversitas struct {
	Nama_Universitas      string `json:"nama_universitas"`
	Alamat_Universitas    string `json:"alamat_universitas"`
	Deskripsi_Universitas string `json:"deskripsi_universitas"`
}

type GetAllUniv struct {
	Nama_Universitas   string `json:"nama_universitas"`
	Alamat_Universitas string `json:"alamat_universitas"`
}
