import mongoose from "mongoose";
import connectDB from "../src/db/dbConnection.js";
import { User } from "../src/model/username.model.js";
import { Video } from "../src/model/video.model.js";

/**
  =============================
    5000 VIDEOS BY  3000 USER
  =============================
 */
 const thumbnail_array = [
   "eHTXQW58WhA", "D3CU_3z1U-I", "VPz9NGNmUcw", "ltr53a7H8Do", "OAlzBhCQKE8",
   "E-F5XJ2jJ1k", "sxRE2LrMBH0", "UhLMbleR8Ww", "2Wyx1BeqCrM", "Ggvts0aNr5I",
   "5zSQ51QJ7U4", "7n-UXD91ZA0", "iYi1gfahISw", "nVt62FD7E0w", "Rw3sMWExang",
   "whrPdKIb14o", "z1n88spvDUI", "AceaOFjwP-c", "MQ8CFE2W99I", "LFn_L4v-qgI",
   "WAwU06NUrNU", "7U1WPt1xvGg", "AQsj5tveK7w", "EgufbZyM2Zo", "SMp71RQNYvc",
   "CUCGM_92DMQ", "reQS52XOzUA", "mBabVukEsQQ", "qraNaY45PlI", "3fgPdY6ZxB0",
   "A7pgChEIFTg", "9bs2ykhX8lU", "Ikw5HyhEP0A", "VkxRYoslxQ0", "fKoAOWQHP0o",
   "iIY9fPgY5wM", "Fd_KYjbmws4", "ZlSvZ5qNWw8", "IMyuKkksRo4", "GpddhlDmN8w",
   "zmrhxrYxonE", "GpddhlDmN8w", "52YR_WcmT3Q", "VmfZeaA-RU0", "7XPjrPBziYk",
   "vz1RlUyrc3w", "KsHbs5RMVYU", "y7S2oSjJ8PA", "xezk6slZhHU", "9DdVrGWHtbw",
   "0je-sGgCHJU", "NVMa86cxU-k", "4EjKroJCpFA", "BWgPyYq_2I8", "1993zSY5UBI",
   "rNbNxwcGCqo", "6W92_t9FveA", "oP_lB6IXqDA", "9S5_E65AbTQ", "1pcikNlDB-4",
   "3WRALKfouoQ", "FoLWmQeA3is", "eGKFTUuJppU", "kL19AnggjTU", "qmdqrZ4Cq3w",
   "cv77l-Bwzsk", "sTwZKzNE0qE", "uU4JRR8vzwU", "0JUN9aDxVmI", "COFQ-wrn9P4",
   "w0ScH1wJj_c", "AyBpssNYB6g", "Dp_88p8hkx4", "_-3h79ioEHs", "J1FqwfcXh0Q",
   "PAGwQi1Dy3Y", "AYBMhpw7W3s", "eHS0WIWNtu0", "ZMiuGjVZz2E", "s24ZVyURGBc",
   "pfZT6Opgy4o", "FzfdD9y839g", "yj9K2IuvG78", "EdDHNiFWzic", "7tC0uRdXnPs",
   "V0VfR0eaz98", "7hr60EumwQ4", "U0EI7XFkkV4", "dLyCoNnKbfg", "5dABaqFNRhc",
   "XJSMjgZ8W6o", "Q-icS7yZz5k", "qV4QdDtiGoQ", "zlGTNqdswPk", "l1pHRTFkKKs",
   "Md4FQco7dp8", "UMMfJ4au1o4", "y2fgw1Oqz28", "6Z1G4w2RGbI", "kJ6MppXJnKI",
   "DHDI9m1hjuc", "5KyfW79Ld4g", "dvHgASyhPSY", "mfv0V1SxbNA", "EIWsQkjxbEw",
   "mIQQzpRcfX0", "ovj_Gor6nSM", "VVcJ71qlC_o", "EbSanuDvGWg", "HnaKB1AcMRQ",
   "EDCwQe7P8T0", "5Q-I_7MQKJs", "jOpn25tgGA8", "hHuG7FIKgtc", "ke1Llbq9rCQ",
   "urk9BJIxZ3U", "RWG66gIo7PM", "wRuF7a7YPtg", "gICkJ1tBr6E", "Dl_n2_ekfN4",
   "i4yOYHBm3rY", "8rxbO0ogtk0", "favi7avxIag", "9tGrhrVKCrE", "1jRGsloyMTQ",
   "F2jp5EOq7KQ", "4i0GLc3WqeE", "G_IG6qw7JL8", "iwSX5U0pVh0", "Sntj4HmuykI",
   "DGF6KahHii0", "encHIv_ouhU", "5paRa6E5rCM", "Dvus0AFefCQ", "yhGzXULZkEw",
   "9m-IB7Zpj1I", "Ez7DlKSvEFY", "cW8FuU_QfKY", "ZEFAlBd9SFg", "f32W5BEzWN0",
   "RSB58m7Xwhg", "Z_xvkbGWauU", "YCha4iUMUOk", "XJZBBk7AYD4", "AtwGY5qO_XQ",
   "0yw-z6f7Mb4", "MWmMvudBgFU", "2jVOkYiAl2s", "H8Lyj2D_cWo", "16X0rONMaWQ",
   "nomgFESEYZI", "5_lUue8lNzI", "ijPq-u3y9cs", "pW5nOwYXeLY", "4_JlIr8yry0",
   "JNZ0nkC7Unk", "ixNNyLcWXX8", "XGa4onZP66Q", "3ZhGgyL7rtc", "CvuNdXB_UQg",
   "coM0JK6o3mo", "7B0ydm64cV8", "Z7y-BE7DbOI", "VE_AAUxTUCY", "AdmLG2xhdvM",
   "xvm3X1oyTL8", "Cgvopu9zg8Y", "wYs1Q8xLbIM", "YWW2OszlsnM", "JQVBGtZMqgU",
   "Lx9uLMN1030", "A8zq0xfXlvY", "9TX7kAmo9bk", "-oviJ6Jx2hU", "pBj9ziOE8OQ",
   "0BiWMVdalRI", "4px19xzK7zI", "Qsq-Sj_rojU", "Nsh4dhSAE7I", "bB6707XzCNc",
   "J570k8jAhwY", "KuMbhQ4CLQ8", "FybXFktvQAw", "QOgCAfqbuSE", "-lEn_5PTTdk",
   "r4AMAzNqZVc", "kJf4MmouR-s", "Pdte4YAvX3g", "YKZCU0ynEbs", "3r5Dfn0JttA",
   "FkeLbE6Q22A", "Dg4uVKfO7hk", "5cBL9o3hXSg", "gF7BqM3lAls", "si6ER4moIZY",
   "BtCGiEHzdfk", "W6aOdLlEz1w", "_Tb8IP_KRYQ", "fUoG63VqCAA", "wg8AS26vp3o", // DONE
   "4Q7x6aBGnlk", "U1UbDslhoXo", "AuOwfkQHUp4", "9DHZLw5653E", "82ikpPF6VYk",
   "6F-X_WcTDVQ", "mfwnpWHimoc", "yYTHomRMuug", "dDmJLezy-M4", "7GkIWPPC9i0",
   "a2i9h2ip-nY", "AQZl-78pnEQ", "rT9XtyfCkcg", "2ZsNn9fAYyE", "I8YnwUV2C9w",
   "JXJf7vL8k94", "dJrzwXPY6Q8", "jzd6wu1thkU", "Xa9L2yx_QH8", "1bhtl5Hj_5Y", // DONE
   "Bp2ai2MD4Mk", "F8p2MamNBgE", "KrkjIHX_ivM", "GoRXAUYW25o", "4naCY3vCSfk",
   "UmGnJ475EcU", "oXVNXFQDDIM", "Vn2rpFln6vY", "uRr8_0x_HYw", "TUojtsvY19s",
   "xCSJlsI3nPo", "zzVa5cvQK6w", "CTJLBCYod9E", "Lt4vy8hfc-s", "MlIBQxE3dwU",
   "yDF3ZOp0uzQ", "9sUBVbQY4b8", "ES18B31hOs", "vIqMSIpZHV4", "LqCEp1PmfgY",
   "C_0BwjfAttE", "LuCXiNxZ1Dw", "a06KMY209AA", "WTWEEBX9D2M", "6kCCIdLLGRs",
   "VVa4c9lMtlM", "y8b1U5wYCgE", "PGIiGCeoVuM", "ga8LeVRmtG0", "b8ZUb_Okxro",
   "bSulWZtc2n8", "6Cv7ihA4388", "Hs8AM57BlVc", "CgBN7e2YU7o", "fVSW3N6Oobw",
   "oyjGMFzKgVQ", "wHX9DKbwVrY", "Vvtex3PTqFg", "sPM2WiwA1us", "rU9ZODw5yvU", // DONE
   "kAOuj6o7Kxs", "wPL2i8KHKTI", "N2vaL3Oz--E", "0Vo3JN567wo", "X8BYu3dMKf0",
   "4NT14gV6n8Y", "RREeZD2L5vA", "yNQ20_RfwUk", "wiOvFcvL6vQ", "c2M-rlkkT5o",
   "8bXPLk6r-r4", "r2JSYgyOdBs", "UuimoKzh1dg", "QyYMvdFwBKA", "6bLkbNgK1Gs",
   "gLeMTK3PeC8", "tww-gbNPOcA", "oeuM6MteziE", "Pv4mkG2K_s8", "mSeGdryJdcc",
   "4tGcfRmxQJc", "hTnggqnC3ug", "VT2YnyGU1z8", "LkSwZilRyPI", "tzAzfOW-ZsM",
   "iQyg-KypKAA", "g0v-ULguDyg", "VhvqBNYtE_c", "N2rLzLdgyKw", "LKcRbnHEwFU", // DONE
   "wJlYo1_8jVk", "cEMTkOE3HqM", "GKdzsdu4FfE", "lmBSvVQYEKE", "DFWC1OWTnFU",
   "w96R-b1n5-M", "4Yl6_l-Tu-0", "93pRTcxigYo", "8qaLG730bDw", "9enrcuz1w10",
   "S5EpsMjel-M", "IQ7HkZ-Gun8", "KhnsKQ2bS08",
 ];

const TOTAL_VIDEOS = 5000;

async function seed_video_metadata() {
  try {
    await connectDB();

    await Video.deleteMany({});

    const channels = await User.find({}, "_id").limit(3000).lean();

    const videos = [];
    let t = 0;
    for (let i = 0; i < TOTAL_VIDEOS; i++) {
      if (t == 301) t = 0;
      videos.push({
        videoFile:
          "https://res.cloudinary.com/dy91w5jjf/video/upload/v1783011234/38391220_cbambu.mp4",
        thumbnail: `https://img.youtube.com/vi/${thumbnail_array[t]}/maxresdefault.jpg`,
        title: `Video Title ${i + 1}`,
        description: `Description for video ${i + 1}`,
        duration: 13,
        views: 0,
        likes: 0,
        disLikes: 0,
        comments: 0,
        share: 0,
        isPublished: true,
        owner: channels[i % channels.length]._id,
      });
      t++;
    }
    await Video.insertMany(videos);
    console.log(`${videos.length} videos inserted successfully`);
    await mongoose.connection.close();
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}
seed_video_metadata();