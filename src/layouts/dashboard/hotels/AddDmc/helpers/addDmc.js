import axios from "src/api/axios";
const addDmc = async (hotelId, dmcId, token, setIsAdded) => {
  let data = new FormData();
  data.append("dmc_id[]", dmcId);
  try {
    const res = await axios.request({
      method: "POST",
      url: `/api/admin/hotels/${hotelId}/dmc/store`,
      headers: { "content-type": "application/json", Authorization: `Bearer ${token}` },
      data: data,
    });
    if (res.status === 200) {
      setIsAdded(true);
    }
  } catch (err) {
    setIsAdded(false);
    console.log(err);
  }
};

export default addDmc;
