import React, { PureComponent } from 'react';

import store from '../../store/store';
import { setLoginWindow } from '../AppActions';

import './Main.less';

export default class Main extends PureComponent {
    onClick = (screen) => {
        store.dispatch(setLoginWindow(true))
    }

    render() {
        const { login } = this.props;

        return (
            <div className="main-screen">
                <section className="header flex">
                    <p className="logo">Site</p>
                    <nav className="flex">
                        <ul className="flex">
                            <li>Home</li>
                            <li>News</li>
                            <li>Articles</li>
                            <li>Forum</li>
                        </ul>
                    </nav>
                    {login === ''
                        ? <button className="login" onClick={this.onClick}>Login</button>
                        : <p className="username">Hi, {login}</p>
                    }
                </section>
                <section className="content flex">
                    <aside>
                        <article>
                            <h3>Bla bla</h3>
                            <p>
                                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Distinctio aperiam omnis itaque magni tempora sit laborum architecto possimus ab iusto repellat rerum velit laboriosam molestias voluptatum quis, animi accusantium sint officia necessitatibus veritatis numquam. Doloremque quis animi consectetur vero dolor ad expedita delectus dolore eos saepe omnis non placeat maiores, cum odio assumenda quo natus, magnam esse fugiat mollitia sunt voluptas sit! Itaque unde et harum quas quidem? Illo deleniti quasi quaerat eum quae veritatis nesciunt soluta, et sint praesentium assumenda explicabo necessitatibus, consequuntur sed harum corrupti nostrum sit fugit quibusdam? Laboriosam molestiae inventore vel amet, libero.
                                </p>
                        </article>
                        <article>
                            <h3>Bla bla</h3>
                            <p>
                                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Distinctio aperiam omnis itaque magni tempora sit laborum architecto possimus ab iusto repellat rerum velit laboriosam molestias voluptatum quis, animi accusantium sint officia necessitatibus veritatis numquam. Doloremque quis animi consectetur vero dolor ad expedita delectus dolore eos saepe omnis non placeat maiores, cum odio assumenda quo natus, magnam esse fugiat mollitia sunt voluptas sit! Itaque unde et harum quas quidem? Illo deleniti quasi quaerat eum quae veritatis nesciunt soluta, et sint praesentium assumenda explicabo necessitatibus, consequuntur sed harum corrupti nostrum sit fugit quibusdam? Laboriosam molestiae inventore vel amet, libero.
              </p>
                        </article>
                        <article>
                            <h3>Bla bla</h3>
                            <p>
                                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Distinctio aperiam omnis itaque magni tempora sit laborum architecto possimus ab iusto repellat rerum velit laboriosam molestias voluptatum quis, animi accusantium sint officia necessitatibus veritatis numquam. Doloremque quis animi consectetur vero dolor ad expedita delectus dolore eos saepe omnis non placeat maiores, cum odio assumenda quo natus, magnam esse fugiat mollitia sunt voluptas sit! Itaque unde et harum quas quidem? Illo deleniti quasi quaerat eum quae veritatis nesciunt soluta, et sint praesentium assumenda explicabo necessitatibus, consequuntur sed harum corrupti nostrum sit fugit quibusdam? Laboriosam molestiae inventore vel amet, libero.
              </p>
                        </article>
                    </aside>
                    <main>
                        <h1>Some interesting story</h1>
                        <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti neque eius a excepturi, explicabo sapiente. Vero quasi non quisquam deserunt sequi numquam ipsum veniam fuga iure saepe voluptatem praesentium dignissimos, aliquam obcaecati beatae perferendis recusandae incidunt tempore animi! Natus aliquid, asperiores sunt eveniet unde fuga facilis earum voluptas sit.
            </p>
                        <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam aliquam modi laudantium voluptatem illo temporibus minima recusandae saepe quam eum, sapiente consequatur provident. Necessitatibus molestiae error accusantium, quos natus architecto praesentium reiciendis aut aliquam possimus iste quae alias eaque odit eveniet ducimus rem labore nihil voluptatum? Asperiores unde architecto cupiditate maxime. Eius sapiente aut sed ducimus eaque nulla dolores fugit eum neque cum veniam praesentium sequi asperiores culpa omnis veritatis doloremque, nam debitis sunt optio dolorum tempore itaque nisi atque! Vel natus ex omnis officiis? Ratione nobis illum commodi, odio laboriosam nisi deserunt dolor cum eaque iusto nesciunt at mollitia quia iste nam iure deleniti dolorem facilis laudantium dicta maxime ullam rem! Quia hic iure cumque, provident temporibus similique! Illum a labore inventore, eveniet reiciendis accusantium, voluptas, commodi provident sed reprehenderit officia asperiores assumenda nihil quis cupiditate natus totam id similique doloribus. Tempore, dignissimos rem natus aperiam corrupti, magni dicta tenetur assumenda ea laborum, eveniet aliquam tempora blanditiis ex animi sint magnam modi maiores commodi pariatur inventore id totam quis. Neque, impedit. Hic dignissimos ut impedit. Ipsum accusantium amet quasi numquam beatae, aspernatur deserunt ea nam incidunt, maiores molestias vel natus repellendus quibusdam excepturi dolor quo voluptatem cumque quos? Quam, et blanditiis tempore, perferendis excepturi labore quisquam dolore nisi minus quod soluta minima, quas id eligendi iure velit officiis! Dolor veritatis qui cum labore repudiandae reiciendis aperiam deleniti. Quo illum excepturi eveniet quisquam provident totam autem id at tenetur doloribus, culpa distinctio hic est eligendi aliquam harum cupiditate iste repellendus? Temporibus enim quaerat necessitatibus ratione reiciendis excepturi explicabo, corporis nam nulla. Voluptates, minima aut temporibus, voluptatem, officiis reiciendis ratione quia quis ea accusantium esse repellat ullam possimus amet at dolor quod dolorem adipisci vel iure cumque perspiciatis repudiandae? Doloribus, facilis ad! Itaque explicabo laborum reprehenderit quidem aspernatur dolorem esse blanditiis?
            </p>
                        <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti neque eius a excepturi, explicabo sapiente. Vero quasi non quisquam deserunt sequi numquam ipsum veniam fuga iure saepe voluptatem praesentium dignissimos, aliquam obcaecati beatae perferendis recusandae incidunt tempore animi! Natus aliquid, asperiores sunt eveniet unde fuga facilis earum voluptas sit.
            </p>
                        <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti neque eius a excepturi, explicabo sapiente. Vero quasi non quisquam deserunt sequi numquam ipsum veniam fuga iure saepe voluptatem praesentium dignissimos, aliquam obcaecati beatae perferendis recusandae incidunt tempore animi! Natus aliquid, asperiores sunt eveniet unde fuga facilis earum voluptas sit.
            </p>
                        <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti neque eius a excepturi, explicabo sapiente. Vero quasi non quisquam deserunt sequi numquam ipsum veniam fuga iure saepe voluptatem praesentium dignissimos, aliquam obcaecati beatae perferendis recusandae incidunt tempore animi! Natus aliquid, asperiores sunt eveniet unde fuga facilis earum voluptas sit.
            </p>
                        <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti neque eius a excepturi, explicabo sapiente. Vero quasi non quisquam deserunt sequi numquam ipsum veniam fuga iure saepe voluptatem praesentium dignissimos, aliquam obcaecati beatae perferendis recusandae incidunt tempore animi! Natus aliquid, asperiores sunt eveniet unde fuga facilis earum voluptas sit.
            </p>
                    </main>
                </section>
            </div>
        );
    }
};