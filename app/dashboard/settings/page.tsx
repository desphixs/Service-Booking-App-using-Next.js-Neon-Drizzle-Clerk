export default function SettingsPage() {
    return (
        <div className="max-w-2xl space-y-8">
            <div>
                <h1 className="text-3xl font-black text-gray-900">Settings</h1>
                <p className="text-gray-500">Manage your account and notification preferences.</p>
            </div>

            <div className="bg-white p-10 rounded-[2.5rem] border border-gray-100 shadow-sm space-y-6">
                <div className="flex items-center gap-6 pb-6 border-b border-gray-50">
                    <div className="w-20 h-20 rounded-3xl bg-indigo-600 flex items-center justify-center text-white text-2xl font-black">DF</div>
                    <button className="px-4 py-2 bg-gray-900 text-white rounded-xl text-sm font-bold">Change Avatar</button>
                </div>

                <div className="grid grid-cols-1 gap-6">
                    <div>
                        <label className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 block">Display Name</label>
                        <input type="text" defaultValue="Destiny Franks" className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-sm focus:outline-indigo-500" />
                    </div>
                    <div>
                        <label className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 block">Email</label>
                        <input type="email" defaultValue="desphixs@gmail.com" className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-sm focus:outline-indigo-500" />
                    </div>
                </div>

                <button className="bg-indigo-600 text-white px-8 py-4 rounded-2xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100">Save Changes</button>
            </div>
        </div>
    );
}
