const useScreenFontSize = (content: string) => {
  let fontSize = 5
  if (content.length <= 150) {
    fontSize = 5
  } else if (content.length < 200) {
    fontSize = 4.7
  } else if (content.length < 250) {
    fontSize = 4.4
  } else if (content.length < 300) {
    fontSize = 4.1
  } else if (content.length < 350) {
    fontSize = 3.8
  } else if (content.length < 400) {
    fontSize = 3.5
  } else if (content.length < 450) {
    fontSize = 3.1
  } else {
    fontSize = 2.8
  }

  return fontSize
}

export default useScreenFontSize;