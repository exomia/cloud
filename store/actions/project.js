export const ProjectAction = {
  nuxtServerInit(vuexContext, context) {
    return new Promise((resolve, reject) => {
      vuexContext.commit('setProject', {
        title: 'Abc'
      })
      resolve()
    })
  }
}
