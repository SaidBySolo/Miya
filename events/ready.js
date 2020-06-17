module.exports = async miya => {
    console.log(miya.user.username + " is Ready.\n")
    miya.user.setPresence({ activity: { name: `미야야 도움을 입력 해보세요!` }, status: 'online' })
}
