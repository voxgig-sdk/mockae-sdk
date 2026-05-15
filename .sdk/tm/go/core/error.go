package core

type MockaeError struct {
	IsMockaeError bool
	Sdk              string
	Code             string
	Msg              string
	Ctx              *Context
	Result           any
	Spec             any
}

func NewMockaeError(code string, msg string, ctx *Context) *MockaeError {
	return &MockaeError{
		IsMockaeError: true,
		Sdk:              "Mockae",
		Code:             code,
		Msg:              msg,
		Ctx:              ctx,
	}
}

func (e *MockaeError) Error() string {
	return e.Msg
}
