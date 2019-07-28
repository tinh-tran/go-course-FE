function getClassList(courseInfo) {
  let data = []
  for (let k in courseInfo) {
    let obj = {}
    obj.title = k
    obj.contain = []
    for (let j in courseInfo[k]) {
      let objcontain = {}
      objcontain.title = j
      objcontain.SectionVideo = courseInfo[k][j].SectionVideo
      objcontain.SectionPdf = courseInfo[k][j].SectionPdf
      objcontain.CourseSectionId = courseInfo[k][j].CourseSectionId
      obj.contain.push(objcontain)
    }
    data.push(obj)
  }
  return data
}

export const getCourseInfo = (classchapter,classsection) => {
  let obj = {}
  for (let i = 0; i < classchapter.length; i++) {
    obj[classchapter[i].ChapterName] = {}
    for (let j = 0; j < classsection.length; j++) {
      if (classsection[j].ChapterId === classchapter[i].ChapterId) {
        obj[classchapter[i].ChapterName][classsection[j].SectionName] = {
          SectionOrder: classsection[j].SectionOrder,
          SectionVideo: classsection[j].SectionVideo,
          SectionPdf: classsection[j].SectionPdf,
          CourseSectionId: classsection[j].CourseSectionId
        }
      }
    }
  }
  return getClassList(obj)
}


function getQuizList(quizInfo){
  let data = []
  for (let k in quizInfo) {
    let obj = {}
    obj.title = k
    obj.contain = []
    for (let j in quizInfo[k]) {
      console.log(quizInfo[k])
      let objcontain = { }
      objcontain.title = j
      objcontain.QuizId = quizInfo[k][j].QuizId
      objcontain.QuizContent = quizInfo[k][j].QuizContent
      objcontain.Answer = quizInfo[k][j].Answer
      obj.contain.push(objcontain)
    }
    data.push(obj)
  }
  return data
}

export const getQuizInfo = (classchapter,classquiz) => {
  let obj = {}
  for (let i = 0; i < classchapter.length; i++) {
    obj[classchapter[i].ChapterName] = {}
    for (let j = 0; j < classquiz.length; j++) {
        if (classquiz[j].ChapterId === classchapter[i].ChapterId) {
          obj[classchapter[i].ChapterName][classquiz[j].QuizContent] = {
            QuizId: classquiz[j].QuizId,
            QuizContent: classquiz[j].QuizContent,
            CourseId: classquiz[j].CourseId,
            Answer: classquiz[j].Answer
          }
      }
    }
  }
  return getQuizList(obj)
}