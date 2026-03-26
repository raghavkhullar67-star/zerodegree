import { useState, useEffect } from "react";
import { fetchAllUsers } from "../service/api";
import { FaUserShield, FaUser } from "react-icons/fa";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const data = await fetchAllUsers();
        setUsers(data);
      } catch (error) {
        console.error("Failed to load user database.", error);
      } finally {
        setLoading(false);
      }
    };
    loadUsers();
  }, []);

  if (loading) {
    return <div className="text-white animate-pulse p-10 uppercase tracking-widest text-xs">Authenticating Database...</div>;
  }

  return (
    <div className="bg-slate-900/40 border border-slate-800/60 p-6 md:p-10 rounded-sm animate-fade-in">
      <div className="mb-10 border-b border-slate-800/60 pb-6">
        <h2 className="text-xl md:text-2xl font-light uppercase tracking-[0.15em] text-white">User Registry</h2>
        <p className="text-xs uppercase tracking-widest text-slate-500 mt-2">Oversee client access and clearance levels.</p>
      </div>

      <div className="overflow-x-auto custom-scrollbar">
        <table className="w-full text-left whitespace-nowrap">
          <thead>
            <tr className="border-b border-slate-800/60 text-[10px] uppercase tracking-widest text-slate-500">
              <th className="py-4 px-4 font-normal">Client ID</th>
              <th className="py-4 px-4 font-normal">Name</th>
              <th className="py-4 px-4 font-normal">Email Node</th>
              <th className="py-4 px-4 font-normal">Clearance</th>
            </tr>
          </thead>
          <tbody className="text-xs md:text-sm font-light text-slate-300">
            {users.length === 0 ? (
              <tr>
                <td colSpan="4" className="py-8 text-center text-slate-500 text-xs tracking-widest uppercase">No Clients Located.</td>
              </tr>
            ) : (
              users.map((user) => (
                <tr key={user._id} className="border-b border-slate-800/40 hover:bg-slate-800/20 transition-colors">
                  <td className="py-5 px-4 font-medium text-slate-400">#{user._id.substring(user._id.length - 6)}</td>
                  <td className="py-5 px-4 text-white">{user.name}</td>
                  <td className="py-5 px-4 text-slate-400">{user.email}</td>
                  <td className="py-5 px-4">
                    <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-sm border text-[10px] uppercase tracking-widest ${user.isAdmin ? 'text-indigo-400 bg-indigo-400/10 border-indigo-400/20' : 'text-slate-400 bg-slate-800 border-slate-700'}`}>
                      {user.isAdmin ? <><FaUserShield /> Admin</> : <><FaUser /> Client</>}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminUsers;
