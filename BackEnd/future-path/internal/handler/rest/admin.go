package rest

import (
	"future-path/model"
	"future-path/pkg/response"
	"net/http"

	"github.com/gin-gonic/gin"
)

func (r *Rest) RegisterAdmin(ctx *gin.Context) {
	param := model.AdminRegister{}
	err := ctx.ShouldBindJSON(&param)
	if err != nil {
		response.Error(ctx, http.StatusBadRequest, "failed to bind input", err)
		return
	}

	err = r.service.AdminService.RegisterAdmin(param)
	if err != nil {
		response.Error(ctx, http.StatusInternalServerError, "failed to register new admin", err)
		return
	}

	response.Success(ctx, http.StatusCreated, "successfully register new admin", nil)
}

func (r *Rest) LoginAdmin(ctx *gin.Context) {
	param := model.AdminLogin{}
	err := ctx.ShouldBindJSON(&param)
	if err != nil {
		response.Error(ctx, http.StatusBadRequest, "failed to bind input", err)
		return
	}

	result, err := r.service.AdminService.Login(param)
	if err != nil {
		response.Error(ctx, http.StatusInternalServerError, "failed to login admin", err)
		return
	}

	response.Success(ctx, http.StatusOK, "successfully login to system", result)

}
