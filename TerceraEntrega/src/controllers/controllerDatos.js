
const datos = async (req, res) => {
    const info = {
        Argumentos: process.argv.slice(2),
        Plataforma: process.platform,
        VersionNode: process.version,
        MemoriaTotal: process.memoryUsage().rss,
        pathExec: process.execPath,
        processId: process.pid,
        Carpeta: process.cwd()
    }

    return await res.render('datos.ejs', { info })
}
export default datos