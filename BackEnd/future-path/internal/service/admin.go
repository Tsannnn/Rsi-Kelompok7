package service

import (
	"errors"
	"future-path/entity"
	"future-path/internal/repository"
	"future-path/model"
	"future-path/pkg/bcrypt"
	"future-path/pkg/jwt"
)

type IAdminService interface {
	Login(param model.AdminLogin) (model.AdminLoginResponses, error)
	RegisterAdmin(param model.AdminRegister) error
	GetAdmin(param model.AdminParam) (entity.Admin, error)
}

type AdminService struct {
	AdminRepository repository.IAdminRepository
	bcrypt          bcrypt.Interface
	jwtAuth         jwt.Interface
}

func NewAdminService(AdminRepository repository.IAdminRepository, bcrypt bcrypt.Interface, jwt jwt.Interface) IAdminService {
	return &AdminService{
		bcrypt:          bcrypt,
		AdminRepository: AdminRepository,
		jwtAuth:         jwt,
	}
}

func (as *AdminService) RegisterAdmin(param model.AdminRegister) error {
	hashPassword, err := as.bcrypt.GenerateFromPassword(param.Password_Admin)
	if err != nil {
		return err
	}

	param.Password_Admin = hashPassword

	admin := entity.Admin{
		Email_Admin:    param.Email_Admin,
		Password_Admin: param.Password_Admin,
		RoleID:         1,
	}

	_, err = as.AdminRepository.CreateAdmin(admin)
	if err != nil {
		return err
	}

	return nil

}

func (ar *AdminService) Login(param model.AdminLogin) (model.AdminLoginResponses, error) {
	var result model.AdminLoginResponses

	admin, err := ar.AdminRepository.GetAdmin(model.AdminParam{
		Email_Admin: param.Email_Admin,
	})
	if err != nil {
		return result, err
	}

	err = ar.bcrypt.CompareAndHashPassword(admin.Password_Admin, param.Password_Admin)
	if err != nil {
		return result, err
	}

	token, err := ar.jwtAuth.CreateToken(admin.ID_Admin)
	if err != nil {
		return result, errors.New("failed to create jwt")
	}

	result.Token = token

	return result, nil
}

func (ar *AdminService) GetAdmin(param model.AdminParam) (entity.Admin, error) {
	return ar.AdminRepository.GetAdmin(param)
}
