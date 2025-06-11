package tn.company.taskManagement.services.interfaces;

import tn.company.taskManagement.entities.User;
import tn.company.taskManagement.services.imp.UserService;

import java.util.List;

public interface UserServiceInterface {
    String generateRandomPassword();
    List<User> getAllUsers();
    User getUserById(int id);

    String handleUserUpdate(int id, User user);
    //simple update + role changing but not the employee fields
    void deleteUser(int id);
    boolean isUsernameTaken(String username);
    boolean isEmailTaken(String email);

    String updatePassword(int userId, UserService.PasswordChangeDTO passwordChangeDTO);

}
