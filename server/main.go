package main

import (
	"math/rand"
	"net/http"
	"strconv"
	"strings"

	"github.com/gin-gonic/gin"
)

type RenameParam struct {
	PrevNickname string `form:"prevNickname"`
	Nickname     string `form:"nickname"`
}

type Response struct {
	CatchStatus   bool   `json:"catchStatus"`
	ReleaseNumber int    `json:"releaseNumber"`
	NewNickname   string `json:"newNickname"`
}

func main() {
	router := gin.Default()

	router.GET("/pokemon/catch", getCatchStatus)
	router.GET("/pokemon/release", getReleaseNumber)
	router.GET("/pokemon/rename", getRenamePokemon)

	router.Run("localhost:8080")
}

func getCatchStatus(c *gin.Context) {
	var res Response
	res.CatchStatus = rand.Intn(100) >= 50
	c.JSON(http.StatusOK, res)
}

func getReleaseNumber(c *gin.Context) {
	var res Response
	res.ReleaseNumber = rand.Intn(100)
	c.JSON(http.StatusOK, res)
}

func getRenamePokemon(c *gin.Context) {
	var param RenameParam
	var res Response

	if err := c.Bind(&param); err != nil {
		return
	}
	splits := strings.Split(param.Nickname, "-")
	current := splits[len(splits)-1]
	currentNum, err := strconv.Atoi(current)

	if err != nil {
		res.NewNickname = param.Nickname + "-0"
	} else {
		var nextNum int
		if currentNum == 0 {
			nextNum = 1
		} else {
			prevSplits := strings.Split(param.PrevNickname, "-")
			prev := prevSplits[len(prevSplits)-1]
			prevNum, err := strconv.Atoi(prev)
			if err != nil {
				return
			}
			nextNum = prevNum + currentNum
		}
		newName := strings.Split(param.Nickname, "-")
		newName[len(newName)-1] = strconv.Itoa(nextNum)
		res.NewNickname = strings.Join(newName, "-")
	}

	c.JSON(http.StatusOK, res)
}
