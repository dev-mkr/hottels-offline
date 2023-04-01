import axios from "src/api/axios";
const addAccOwnerToHotel = async (hotelId, account_owner_id, token, setAccountOwner) => {
  let data = new FormData();
  data.append("dmc_id[]", account_owner_id);
  try {
    const res = await axios.request({
      method: "POST",
      url: `/api/admin/hotels/${hotelId}/dmc/store`,
      headers: { "content-type": "application/json", Authorization: `Bearer ${token}` },
      data: data,
    });
    if (res.status === 200) {
      setAccountOwner(account_owner_id);
    }
  } catch (err) {
    console.log(err);
  }
};

export default addAccOwnerToHotel;
