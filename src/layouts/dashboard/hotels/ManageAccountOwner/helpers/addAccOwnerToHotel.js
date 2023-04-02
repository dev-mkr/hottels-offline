import axios from "src/api/axios";
const addAccOwnerToHotel = async (
  hotelId,
  account_owner_id,
  token,
  setAccountOwner,
  selectedAccountOwnerName,
  mutate
) => {
  try {
    let data = new FormData();
    data.append("admin_id", account_owner_id);

    const res = await axios.request({
      method: "POST",
      url: `/api/admin/hotels/${hotelId}/owner/store`,
      headers: { "content-type": "application/json", Authorization: `Bearer ${token}` },
      data: data,
    });
    if (res.status === 200) {
      setAccountOwner(res.data.response.account_owner.id);
      selectedAccountOwnerName(res.data.response.account_owner.name);
      mutate();
    }
  } catch (err) {
    console.log(err);
  }
};

export default addAccOwnerToHotel;
