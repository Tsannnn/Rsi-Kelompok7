package entity

type Admin struct {
	ID_Admin       int    `json:"id_admin" gorm:"type:smallint;primary_key;autoIncrement"`
	Email_Admin    string `json:"email_admin" gorm:"type:varchar(30);not null"`
	Password_Admin string `json:"password_admin" gorm:"type:varchar(100);not null"`
	RoleID         int    `json:"role_id"`
}
