const state = () => ({

    userInfo: localStorage.getItem('userInfo')
      ? JSON.parse(localStorage.getItem('userInfo') as string)
      : null as Record<string, any> | null,
      
})

export default state