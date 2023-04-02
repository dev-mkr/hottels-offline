import axios from "src/api/axios";
const removeAccOwnerFromHotel = async (
  hotelId,
  token,
  setSelectedAccountOwnerId,
  setSelectedAccountOwnerName
) => {
  try {
    let data = new FormData();
    data.append("_method", "delete");

    const res = await axios.request({
      method: "POST",
      url: `/api/admin/hotels/${hotelId}/owner/destroy`,
      headers: { "content-type": "application/json", Authorization: `Bearer ${token}` },
      data: data,
    });
    if (res.status === 200) {
      setSelectedAccountOwnerId(null);
      setSelectedAccountOwnerName(null);
    }
  } catch (err) {
    console.log(err);
  }
};

export default removeAccOwnerFromHotel;
