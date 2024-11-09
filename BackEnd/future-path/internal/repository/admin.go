package repository

import (
	"future-path/entity"
	"future-path/model"

	"gorm.io/gorm"
)

type IAdminRepository interface {
	GetAdmin(param model.AdminParam) (entity.Admin, error)
	CreateAdmin(admin entity.Admin) (entity.Admin, error)
}

type AdminRepository struct {
	db *gorm.DB
}

func NewAdminRepository(db *gorm.DB) IAdminRepository {
	return &AdminRepository{db}
}

func (ar *AdminRepository) CreateAdmin(admin entity.Admin) (entity.Admin, error) {
	err := ar.db.Debug().Create(&admin).Error
	if err != nil {
		return admin, err
	}

	return admin, nil
}

func (ar *AdminRepository) GetAdmin(param model.AdminParam) (entity.Admin, error) {
	admin := entity.Admin{}
	err := ar.db.Debug().Where(&param).First(&admin).Error
	if err != nil {
		return admin, err
	}
	return admin, nil
}
