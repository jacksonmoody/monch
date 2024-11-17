import { type HistoryData } from "@/components/historyData";
import { pinata } from "@/lib/config";

const getFile = async (userId: string, filename: string) => {
  try {
    const groupForUser = await pinata.groups.list().name(userId);
    if (groupForUser.length === 0) {
      return null;
    }
    const listedFilesByGroup = await pinata
      .listFiles()
      .group(groupForUser[0].id);
    const file = listedFilesByGroup.find(
      (f) => f.metadata.name === filename
    )?.ipfs_pin_hash;
    if (!file) {
      return null;
    } else {
      const returnFile = await pinata.gateways.get(file);
      return returnFile.data;
    }
  } catch (e) {
    console.error("API Error:", e);
  }
};

export async function helper_post(userId: string, IpfsHash: string) {
  try {
    const url =
      "https://monch-app-backend-9bc96edc09ce.herokuapp.com/process/" +
      IpfsHash;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    const date = new Date().toISOString().substring(0, 10);

    const currentfile = await getFile(userId, "history.json");
    let newFile: HistoryData = {};
    if (!currentfile) {
      newFile[date] = [
        {
          name: data.name,
          calories: data.calories,
          protein: data.protein,
          carbs: data.carbs,
          fat: data.fats,
          image: IpfsHash,
        },
      ];
    } else {
      newFile = currentfile as unknown as HistoryData;
      if (!newFile[date]) {
        newFile[date] = [
          {
            name: data.name,
            calories: data.calories,
            protein: data.protein,
            carbs: data.carbs,
            fat: data.fats,
            image: IpfsHash,
          },
        ];
      } else {
        newFile[date].push({
          name: data.name,
          calories: data.calories,
          protein: data.protein,
          carbs: data.carbs,
          fat: data.fats,
          image: IpfsHash,
        });
      }
    }

    await pinata.unpin([IpfsHash]);
    const existingGroup = await pinata.groups.list().name(userId);

    let groupId = "";
    if (existingGroup.length === 0) {
      const newGroup = await pinata.groups.create({
        name: userId,
      });
      groupId = newGroup.id;
    } else {
      groupId = existingGroup[0].id;
    }

    const uploadedFile = await pinata.upload.json(newFile).addMetadata({
      name: "history.json",
    });

    await pinata.groups.addCids({
      groupId: groupId,
      cids: [uploadedFile.IpfsHash],
    });
  } catch (e) {
    console.log(e);
  }
}
