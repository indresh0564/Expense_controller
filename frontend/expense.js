let expenseList = document.querySelector(".expense-list");
let leaderboardBtn = document.querySelector('#leaderboard-btn');
let generateReportBtn = document.querySelector('.generateReport');

expenseList.addEventListener("click", deleteExpense);
leaderboardBtn.addEventListener('click', updateLeaderboard);
generateReportBtn.addEventListener('click', generateReport);


//show Leaderboard On screen

// function showOnLeaderboard() {
//   try {
//     const inputEle = document.createElement("input");
//     inputEle.value = "Show Leaderboard";
//     inputEle.type = "button";

//     inputEle.onclick = async (e) => {
//       const token = localStorage.getItem("token");
//       const leaderboard_list = await axios.get(
//         "http://localhost:3000/leaderboard",
//         { headers: { Authorization: token } }
//       );

//       var leaderboardEle = document.getElementById("leaderboard_id");
//       leaderboardEle.innerHTML += "<h1>Leader Board</h1>";

//       leaderboard_list.data.forEach((element) => {
//         leaderboardEle.innerHTML += `<li>Name - ${
//           element.name
//         } TotalExpense - ${element.totalExpense || 0}</li>`;
//       });
//     };

//     const download = document.createElement("input");
//     download.value = "Download Expense";
//     download.type = "button";

//     download.onclick = (e) => {
//       const token = localStorage.getItem("token");
//       axios
//         .get("http://localhost:3000/user/download", {
//           headers: { Authorization: token },
//         })
//         .then((response) => {
//           if (response.status === 201) {
//             //the bcakend is essentially sending a download link
//             //  which if we open in browser, the file would download
//             var a = document.createElement("a");
//             a.href = response.data.fileUrl;
//             a.download = "myexpense.csv";
//             a.click();
//           } else {
//             throw new Error(response.data.message);
//           }
//         })
//         .catch((err) => {
//           showError(err);
//         });
//     };

//     document.getElementById("message").innerHTML = "you are a premium user";
//     document.getElementById("message").appendChild(inputEle);
//     document.getElementById("message").appendChild(download);
//   } catch (err) {
//     console.log(err);
//   }
// }

function generateReport(e){
        const token = localStorage.getItem("token");
        axios
          .get("http://localhost:3000/download", {
            headers: { Authorization: token },
          })
          .then((response) => {
            if (response.status === 201) {
              //the bcakend is essentially sending a download link
              //  which if we open in browser, the file would download
              var a = document.createElement("a");
              a.href = response.data.fileUrl;
              a.download = "myexpense.csv";
              a.click();
            } else {
              throw new Error(response.data.message);
            }
          })
          .catch((err) => {
            showError(err);
          });
      };

//  buy premium button function

document.getElementById("rzp-button1").onclick = async function (e) {
  const token = localStorage.getItem("token");
  const response = await axios.get("http://localhost:3000/get_order", {
    headers: { Authorization: token },
  });

  var option = {
    key: response.data.key_id,
    order_id: response.data.order.id,

    handler: async function (response) {
      await axios.post(
        "http://localhost:3000/post_order",
        {
          order_id: option.order_id,
          payment_id: response.razorpay_payment_id,
        },
        { headers: { authorization: token } }
      );

      alert("you are a Premium User Now");
      document.getElementById("rzp-button1").style.visibility = "hidden";
      document.querySelector('.leaderboard').classList.remove('d-none');

    },
  };
  const rzp1 = new Razorpay(option);
  rzp1.open();
  e.preventDefault();

  rzp1.on("payment.failed", function (response) {
    console.log(response);
    alert("Something went wrong");
  });
};

//  save expenses in database

async function savetolocalstorage(e) {
  try {
    e.preventDefault();
    const expense = e.target.expense.value;
    const description = e.target.description.value;
    const category = e.target.category.value;

    const obj = {
      expense,
      description,
      category,
    };
    const token = localStorage.getItem("token");
    await axios.post("http://localhost:3000/expense", obj, {
      headers: { Authorization: token },
    });
    showOnScreen(obj);
  } catch (err) {
    console.log(err);
  }
}

// show expenses on screen

function showOnScreen(obj) {
  try {
    let output = `<tr>
    <th scope="row">${obj.description}</th>
    <td>${obj.category}</td>
    <td>${obj.expense}</td>
    <td id="delete-btn">
        <button type="button" id="${obj.id}" class="btn small delete">Delete</button>
    </td>
   </tr>`;
    let t = document.getElementById("tbody");
    t.innerHTML += output;
  } catch (err) {
    console.log(err);
  }
}

    // update leaderboard

    async function updateLeaderboard(e) {

      const token = localStorage.getItem('token');
      try {
          const response = await axios.get(
            "http://localhost:3000/leaderboard",
            { headers: { Authorization: token } }
          );
          // const leaderBoardList = document.querySelector('.leaderboard-list');
          // leaderBoardList.innerHTML = '';
    
          response.data.forEach(userDetail => {
            let output = `<tr>
            <td>${userDetail.name}</td>
            <td>${userDetail.totalExpense || 0}</td>
           </tr>`;
           var tablerow = document.getElementById("tbodyleader");
           tablerow.innerHTML += output;
       
          })
      } catch (e) {
          console.log(e);
      }
    }

// Delete Expense From Database

async function deleteExpense(e) {
  if (e.target.classList.contains("delete")) {
    const id = e.target.getAttribute("id");
    e.target.parentElement.parentElement.remove();
    const token = localStorage.getItem("token");
    if (token) {
      try {
        await axios.delete(`http://localhost:3000/delete_expense/${id}`, {
          headers: { Authorization: token },
        });
      } catch (e) {
        console.log(e);
      }
    }
  }
}

// show leaderboard button and hide buyPremium button on screen
// show expenses on screen

window.addEventListener("DOMContentLoaded", (req, res) => {
  const token = localStorage.getItem("token");

  try {
    axios
      .get("http://localhost:3000/ispremiumuser", {
        headers: { Authorization: token },
      })
      .then((response) => {

        if (response.data === true) {
          document.getElementById("rzp-button1").style.visibility = "hidden";
          document.querySelector('.leaderboard').classList.remove('d-none');
          document.querySelector('.generateReport').classList.remove('d-none');

          updateLeaderboard();
          res.status(202).json({ response: response });
        }
      })
      .catch((err) => {
         throw new Error(err);
      });

    axios
      .get("http://localhost:3000/get_expenses", {
        headers: { Authorization: token },
      })
      .then((result) => {
        for (let i = 0; i < result.data.length; i++) {
          showOnScreen(result.data[i]);
        }
      })
      .catch((err) => {
        throw new Error(err);
      });
  } catch (err) {
    res.status(500).json({ err: err });
  }
});


