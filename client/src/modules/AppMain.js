export default function AppMain({ child }) {
    return (
        <main className="app-main">
            <div className="app-content-header">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-sm-6">
                            <h3 className="mb-0">Dashboard v3</h3>
                        </div>
                        <div className="col-sm-6">
                            <ol className="breadcrumb float-sm-end">
                                <li className="breadcrumb-item">
                                    <a href="#">Home</a>
                                </li>
                                <li
                                    className="breadcrumb-item active"
                                    aria-current="page"
                                >
                                    Dashboard v3
                                </li>
                            </ol>
                        </div>
                    </div>
                </div>
            </div>
            <div className="app-content">{child}</div>
        </main>
    );
}
