<div id="registro" class="tab-content active">
    <h1 data-pt="Registro" data-en="Register">Registro</h1>
    
    <div id="baseRegistro">
        <form action="conta.php?acao=registrar" method="POST">
            
            <div class="input-container">
                <span data-pt="Nome completo" data-en="Full name">Nome completo</span>
                <div><input type="text" name="nome" required></div>
                <br>

                <span data-pt="Data de nascimento" data-en="Date of birth">Data de nascimento</span>
                <div id="container-flex">
                    <input type="date" name="nascimento" id="date1" required/>        
                </div>
                <br>

                <span data-pt="E-mail" data-en="E-mail">E-mail</span>
                <div><input type="email" name="email" required></div>
                <br>

                <span data-pt="Telefone" data-en="Phone">Telefone</span>
                <div><input type="tel" name="telefone" required></div>
                <br>

                <span data-pt="Senha" data-en="Password">Senha</span>
                <div><input type="password" name="senha" required></div>
                <br>

                <span data-pt="Repetir senha" data-en="Repeat password">Repetir senha</span>
                <div><input type="password" name="repetir_senha" required></div>
                <br>
            </div>

            <input type="hidden" name="aceitar_termos" id="aceitar_termos" value="0">
            <input type="hidden" name="aceitar_consentimento" id="aceitar_consentimento" value="0">

            <div><input type="button" value="Cadastrar" onclick="showTermsPopup()" data-pt="Cadastrar" data-en="Register" id="botao-registro"></div>
        
        </form>
    </div>
</div>


<div id="login" class="tab-content">
    <h1 data-pt="Login" data-en="Login">Login</h1>
    
    <div id="baseLogin">
        <form action="conta.php?acao=login" method="POST">
            
            <div class="input-container">
                <span data-pt="E-mail" data-en="E-mail">E-mail</span>
                <div><input type="email" name="email" required></div>
                <br>

                <span data-pt="Senha" data-en="Password">Senha</span>
                <div><input type="password" name="senha" required></div>
                <br>
            </div>

            <div><input type="submit" value="Entrar" data-pt="Entrar" data-en="Login" id="botao-login"></div>
            
            <div style="text-align: center; margin-top: 15px;">
                <a href="#" onclick="showForgotPassword()" style="color: #007bff; text-decoration: none; font-size: 14px;" data-pt="Esqueci minha senha" data-en="Forgot my password">Esqueci minha senha</a>
            </div>

        </form>
    </div>
</div>

<div id="forgot-password" class="tab-content">
    <h1 data-pt="Redefinir Senha" data-en="Reset Password">Redefinir Senha</h1>
    
    <div id="baseForgotPassword">
        <form action="conta.php?acao=redefinir_senha" method="POST">
            
            <div class="input-container">
                <span data-pt="E-mail" data-en="E-mail">E-mail</span>
                <div><input type="email" name="email" required></div>
                <br>

                <span data-pt="Nova Senha" data-en="New Password">Nova Senha</span>
                <div><input type="password" name="nova_senha" required></div>
                <br>

                <span data-pt="Confirmar Nova Senha" data-en="Confirm New Password">Confirmar Nova Senha</span>
                <div><input type="password" name="confirmar_senha" required></div>
                <br>
            </div>

            <div><input type="submit" value="Redefinir" data-pt="Redefinir" data-en="Reset" id="botao-redefinir"></div>
            
            <div style="text-align: center; margin-top: 15px;">
                <a href="#" onclick="showLogin()" style="color: #007bff; text-decoration: none; font-size: 14px;" data-pt="Voltar ao Login" data-en="Back to Login">Voltar ao Login</a>
            </div>

        </form>
    </div>
</div>