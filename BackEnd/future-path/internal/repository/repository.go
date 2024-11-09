package repository

import "gorm.io/gorm"

type Repository struct {
	UserRepository        IUserRepository
	BeritaRepository      IBeritaRepository
	AdminRepository       IAdminRepository
	SekolahRepository     ISekolahRepository
	UniversitasRepository IUniversitasRepository
	FAQRepository         IFAQRepository
}

func NewRepository(db *gorm.DB) *Repository {
	return &Repository{
		UserRepository:        NewUserRepository(db),
		BeritaRepository:      NewBeritaRepository(db),
		AdminRepository:       NewAdminRepository(db),
		SekolahRepository:     NewSekolahRepository(db),
		UniversitasRepository: NewUniversitasRepository(db),
		FAQRepository:         NewFAQRepository(db),
	}
}
