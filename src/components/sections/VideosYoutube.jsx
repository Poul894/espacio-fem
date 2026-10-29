import { videos } from "../../data/videos";

const getEmbedUrl = (video) => {
  if (video.url) {
    try {
      const url = new URL(video.url);
      if (url.hostname.includes("youtube.com")) {
        const id = url.searchParams.get("v");
        if (id) return `https://www.youtube.com/embed/${id}`;
      }
      if (url.hostname.includes("youtu.be")) {
        const id = url.pathname.replace("/", "");
        if (id) return `https://www.youtube.com/embed/${id}`;
      }
    } catch (e) {
      // ignore
    }
  }
  if (video.id) return `https://www.youtube.com/embed/${video.id}`;
  return null;
};

const VideosYoutube = () => {
  if (!videos || videos.length === 0) return null;

  return (
    <section id="videos" className="relative py-14 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center">
          <span className="mb-4 inline-flex items-center gap-2 rounded-pill border border-violet/40 px-5 py-1 text-[10px] uppercase tracking-[0.4em] text-violet-deep">
            Videos
          </span>
          <h2 className="font-display text-[clamp(2rem,4vw,3.5rem)] leading-tight text-plum">Videos de YouTube</h2>
          <p className="mt-3 max-w-2xl text-base text-plum-light sm:text-lg">
            Conocé un poco más sobre el espacio y los masajes.
          </p>
        </div>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {videos.map((video, idx) => {
            const embed = getEmbedUrl(video);
            if (!embed) return null;
            return (
              <article key={idx} className="card-soft overflow-hidden">
                <div className="relative w-full aspect-video">
                  <iframe
                    src={embed}
                    title={video.title || "Video de Espacio Fem"}
                    className="absolute inset-0 h-full w-full"
                    loading="lazy"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  ></iframe>
                </div>
                {(video.title || video.description) && (
                  <div className="flex flex-col gap-1 p-5">
                    {video.title && <h3 className="font-display text-lg text-plum">{video.title}</h3>}
                    {video.description && <p className="text-sm text-plum-light">{video.description}</p>}
                  </div>
                )}
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default VideosYoutube;
